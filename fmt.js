let editor = document.querySelector("#editor");
let output = document.querySelector("#output");
let format = document.querySelector("#format");
let voutput = [];
let outv = ch => { if (ch !== null && ch > 0) voutput.push(ch) };

// Suppreses `RuntimeError: unreachable` warning when formatting
err = msg => { if (!msg.includes('RuntimeError: unreachable')) console.warn(msg) }

FS.init(() => null, outv, outv);
FS.writeFile("/v", "");
FS.symlink("/v", "/proc/self/exe");
ENV.TERM = "dumb";

format.addEventListener("click", () => {
    voutput = [];
    output.textContent = "";
    FS.writeFile("main.v", editor.textContent);
    const t0 = performance.now()
    Module.callMain(["fmt", "-worker", "main.v"])
	const t1 = performance.now()
	console.log(`Formatting took ${(t1 - t0).toFixed(2)}ms.`)
});

quit_ = ((status, error) => {
    if (status === 0) {
        window._codejar.updateCode(FS.readFile("/home/web_user/.cache/vfmt_main.v", { encoding: "utf8" }));
    } else {
        output.append(String.fromCodePoint(...voutput))
    }
    voutput = []
});
