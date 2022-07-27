<script>
	let name = 'world';
	let baseTime = new Date()
	let currentTime = new Date()
	$: shownTime = new Date(currentTime - baseTime)
	
	let pastTimes = []
	$: reversedPastTimes = (() => {
		let temp = pastTimes.slice(); temp.reverse(); return temp
	})()
	
	setInterval(() => {
		currentTime = new Date()
	}, 1)
	
	function formatNumber(n) {
		return n.toString().padStart(2, "0")
	}
	
	function formatTime(t) {
		return `${formatNumber(t.getMinutes())}:${formatNumber(t.getSeconds())}`
	}
	
	function reset() {
		pastTimes.push(shownTime)
		pastTimes = pastTimes
		baseTime = new Date()
		currentTime = baseTime
	}
</script>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 16px;
	}
	
	.timer-display {
				font-size: 128px;
		padding: 64px;
		cursor: pointer;
	}
	
	.past-times {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 16px;
	}
</style>

<div class="container">
	<div class="timer-display" on:click={reset}>{formatTime(shownTime)}</div>
	<div class="past-times">
		{#each reversedPastTimes as p}
			<div class="past-time">{formatTime(p)}</div>
		{/each}
	</div>

</div>
