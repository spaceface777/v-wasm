const (
	max = 25
)

struct Fib {
mut:
	nums []int
}

fn (mut fib Fib) calc(n int) int {
	if n <= 1 {
		return n
	}
	if fib.nums[n] != 0 {
		return fib.nums[n]
	}
	fib.nums[n] = fib.calc(n - 1) + fib.calc(n - 2)
	return fib.nums[n]
}

fn main() {
	mut fib := Fib{
		nums: []int{len: max}
	}
	for i in 0 .. max {
		println(fib.calc(i))
	}
}
