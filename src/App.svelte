<script>
	let baseTime = new Date();
	let currentTime = new Date();
	$: shownTime = new Date(currentTime - baseTime);

	let pastTimes = [];
	$: reversedPastTimes = (() => {
		let temp = pastTimes.slice();
		temp.reverse();
		return temp;
	})();

	setInterval(() => {
		currentTime = new Date();
	}, 1);

	function formatNumber(n) {
		return n.toString().padStart(2, "0");
	}

	function formatTime(t) {
		return `${formatNumber(t.getMinutes())}:${formatNumber(
			t.getSeconds()
		)}`;
	}

	function reset() {
		pastTimes.push(shownTime);
		pastTimes = pastTimes;
		baseTime = new Date();
		currentTime = baseTime;
	}
</script>

<div class="container">
	<div class="timer-display" on:click={reset}>
		{formatTime(shownTime)}
	</div>
	<div class="past-times">
		{#each reversedPastTimes as p}
			<div class="past-time">{formatTime(p)}</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 16px;
	}

	.timer-display {
		height: 128px;
		font-size: 128px;
		padding-top: 64px;
		padding-bottom: 64px;
		cursor: pointer;
		width: 340px;
	}

	.past-times {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 16px;
	}
</style>
