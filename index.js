arguments_.push("-b", "js", "main.v")
FS.writeFile("main.v", document.querySelector("textarea").value)

let pre = document.querySelector("pre")

let println = string => pre.append(string, "\n")

Module.addOnPostRun(() =>
{
	Function("println", FS.readFile("main.js", {encoding: "utf8"}))(println)
	pre.append("\nReload to run another program.")
})
