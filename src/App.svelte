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
	<footer>Copyright © Earnest Bits LLC, 2022</footer>
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-rows: 256px calc(100% - 256px - 32px) 32px;
		height: 100%;
		box-sizing: border-box;
	}

	.timer-display {
		display: flex;
		align-items: center;
		font-size: 128px;
		padding-top: 32px;
		padding-bottom: 32px;
		box-sizing: border-box;
		cursor: pointer;
		width: 340px;
	}

	.past-times {
		align-self: flex-start;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		overflow: scroll;
		gap: 8px;
		font-size: 16px;
		max-height: 100%;
	}

	footer {
		display: flex;
		justify-content: center;
		color: #ccc;
		font-size: 12px;
		line-height: 32px;
	}
</style>
