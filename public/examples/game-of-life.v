fn JS.console.log(out any)
fn JS.console.clear()
fn JS.setInterval(f fn (), ms int)

fn JS.set(obj any, key any, value any)
fn JS.get2(obj any, i any, j any) bool
fn JS.get(obj any, i any) any

fn println(out any) { JS.console.log(out) }
fn clear() { JS.console.clear() }

const (w = 30 h = 30)

fn get_(game [][]bool, x int, y int) bool
{
	if y < 0 || x < 0 { return false }
	if y >= h || x >= w { return false }
	
	return JS.get2(game, y, x)
}

fn neighbours(game [][]bool, x int, y int) int
{
	mut count := 0
	if get_(game, x-1, y-1) { count++ }
	if get_(game, x, y-1) { count++ }
	if get_(game, x+1, y-1) { count++ }
	if get_(game, x-1, y) { count++ }
	// if get_(game, x, y) { count++ }
	if get_(game, x+1, y) { count++ }
	if get_(game, x-1, y+1) { count++ }
	if get_(game, x, y+1) { count++ }
	if get_(game, x+1, y+1) { count++ }
	return count
}

fn step(game [][]bool) [][]bool
{
	mut new_game := [[false]]
	for y, row in game
	{
		mut new_row := [false]
		JS.set(new_game, y, new_row)
		for x, cell in row
		{
			count := neighbours(game, x, y)
			JS.set(new_row, x, cell && count == 2 || count == 3)
		}
	}
	return new_game
}

fn row_str(row []bool) string
{
	mut str := ""
	for cell in row
	{
		if cell { str += "# " }
		else { str += "  " }
	}
	return str
}

fn show(game [][]bool)
{
	clear()
	for row in game
	{
		println(row_str(row))
	}
}

mut game := [[false]]

for y in 0..h
{
	mut row := []bool{}
	JS.set(game, y, row)
	for x in 0..w
	{
		JS.set(row, x, false)
	}
}

JS.set(JS.get(game, 11), 15, true)
JS.set(JS.get(game, 11), 16, true)
JS.set(JS.get(game, 12), 16, true)
JS.set(JS.get(game, 10), 21, true)
JS.set(JS.get(game, 12), 20, true)
JS.set(JS.get(game, 12), 21, true)
JS.set(JS.get(game, 12), 22, true)

JS.setInterval(fn () { show(game) game = step(game) }, 500)
