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

let lib = {
	console: {
		log: value => output.append(value + "\n"),
		error: value => output.append(value + "\n"),
		clear: () => output.textContent = "",
	},
	setTimeout: (f, ms) => {
		play.disabled = true
		stop.disabled = false
		let id = setTimeout(() => {
			f()
			ids = ids.filter(v => v !== id)
			if (ids.length === 0) {
				play.disabled = false
				stop.disabled = true
			}
		}, ms)
		ids.push(id)
	},
	process: {
		stdout: { write: s => output.append(s) },
		stderr: { write: s => output.append(s) },
	}
}

let libKeys = Object.keys(lib)
let libValues = libKeys.map(key => lib[key])

stop.addEventListener("click", () => {
	for (let id of ids) clearTimeout(id)
	ids = []
	play.disabled = false
	stop.disabled = true
})

let success

play.addEventListener("click", () => {
	output.textContent = ""
	voutput = []

	FS.writeFile("main.v", editor.textContent)
	ENV.TERM = "dumb"

	success = true

	const t0 = performance.now()
	Module.callMain(["-b", "js", "main.v"])
	const t1 = performance.now()
	console.log(`Compilation took ${(t1 - t0).toFixed(2)}ms.`)

	if (success) {
		try {
			const t0 = performance.now()
			Function(...libKeys, FS.readFile("main.js", { encoding: "utf8" }))(...libValues)
			const t1 = performance.now()
			console.log(`Execution took ${(t1 - t0).toFixed(2)}ms.`)
		}
		catch (error) {
			output.append("\n")
			if (error instanceof Error) output.append(error.stack)
			else output.append(String(error))
		}
	}
})

quit_ = (status, error) => {
	if (status !== 0) {
		success = false
		output.append(String.fromCodePoint(...voutput))
		throw error
	}
}
