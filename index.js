let editor = document.querySelector("#editor")
let output = document.querySelector("#output")

let voutput = []

let outv = ch => { if (ch !== null) voutput.push(ch) }
FS.init(() => null, outv, outv)

FS.writeFile("/v", "")
FS.symlink("/v", "/proc/self/exe")

let play = document.querySelector("#play")
let stop = document.querySelector("#stop")

let ids = []

let lib =
{
	console:
	{
		log: value => output.append(value + "\n"),
		clear: () => output.textContent = "",
	},
	set: (obj, key, value) => obj[key] = value,
	get: (obj, i) => obj[i],
	get2: (obj, i, j) => obj[i][j],
	setInterval: (f, ms) =>
	{
		play.disabled = true
		stop.disabled = false
		ids.push(setInterval(f, ms))
	},
}

let libKeys = Object.keys(lib)
let libValues = libKeys.map(key => lib[key])

stop.addEventListener("click", () =>
{
	for (let id of ids) clearInterval(id)
	ids = []
	play.disabled = false
	stop.disabled = true
})

let success

export default () =>
{
	output.textContent = ""
	voutput = []
	
	FS.writeFile("main.v", editor.textContent)
	ENV.TERM = "dumb"
	
	success = true
	
	Module.callMain(["-b", "js", "main.v"])
	
	if (success)
	{
		try
		{
			Function(...libKeys, FS.readFile("main.js", {encoding: "utf8"}))(...libValues)
		}
		catch (error)
		{
			output.append("\n")
			if (error instanceof Error) output.append(error.stack)
			else output.append(String(error))
		}
	}
}

quit_ = (status, error) =>
{
	success = false
	output.append(String.fromCodePoint(...voutput))
	throw error
}
