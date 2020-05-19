let editor = document.querySelector("#editor")
let output = document.querySelector("#output")

let voutput = []

let outv = ch => { if (ch !== null) voutput.push(ch) }
FS.init(() => null, outv, outv)

FS.writeFile("v", "")
FS.symlink("v", "/proc/self/exe")

let println = string => output.append(string, "\n")

let success

export default () =>
{
	output.textContent = ""
	voutput = []
	
	FS.writeFile("main.v", editor.textContent)
	ENV.TERM = "dumb"
	
	success = true
	
	Module.callMain(["-b", "js", "main.v"])
	
	if (success) Function("println", FS.readFile("main.js", {encoding: "utf8"}))(println)
}

quit_ = (status, error) =>
{
	success = false
	output.append(String.fromCodePoint(...voutput))
	throw error
}
