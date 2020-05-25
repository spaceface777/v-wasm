fn JS.console.clear()
fn clear() { JS.console.clear() }

fn JS.setInterval(f fn (), ms int)

const (
	w = 30
	h = 30
)

fn get(game [][]bool, x int, y int) bool {
	if y < 0 || x < 0 { return false }
	if y >= h || x >= w { return false }

	return game[y][x]
}

fn neighbours(game [][]bool, x int, y int) int {
	mut count := 0
	if get(game, x-1, y-1) { count++ }
	if get(game, x, y-1) { count++ }
	if get(game, x+1, y-1) { count++ }
	if get(game, x-1, y) { count++ }
	if get(game, x+1, y) { count++ }
	if get(game, x-1, y+1) { count++ }
	if get(game, x, y+1) { count++ }
	if get(game, x+1, y+1) { count++ }
	return count
}

fn step(game [][]bool) [][]bool {
	mut new_game := [[false]]
	for y, row in game {
		mut new_row := [false]
		new_game[y] = new_row
		for x, cell in row {
			count := neighbours(game, x, y)
			new_row[x] = cell && count == 2 || count == 3 // TODO: count in [2, 3]
		}
	}
	return new_game
}

fn row_str(row []bool) string {
	mut str := ''
	for cell in row {
		if cell { str += '◼ ' }
		else { str += '◻ ' }
	}
	return str
}

fn show(game [][]bool) {
	clear()
	for row in game {
		println(row_str(row))
	}
}

mut game := [][]bool

for y in 0..h {
	mut row := []bool{}
	for x in 0..w {
		row[x] = false
	}
	game[y] = row
}

game[11][15] = true
game[11][16] = true
game[12][16] = true
game[10][21] = true
game[12][20] = true
game[12][21] = true
game[12][22] = true

JS.setInterval(fn () { show(game) game = step(game) }, 500)
