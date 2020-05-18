arguments_.push("-b", "js", "main.v")
FS.writeFile("main.v", document.querySelector("#editor").textContent)

let output = document.querySelector("#output")

let println = string => output.append(string, "\n")

Module.addOnPostRun(() =>
{
	Function("println", FS.readFile("main.js", {encoding: "utf8"}))(println)
	output.append("\nReload to run another program.")
})
