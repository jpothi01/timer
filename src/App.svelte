<script>
	let wakeLock;

	async function enableWakeLock() {
		if (wakeLock || !navigator.wakeLock) {
			return;
		}

		try {
			wakeLock = await wakeLock.request("screen");
		} catch (e) {
			console.error("Could not get wake lock: ", e);
		}
	}

	const openTime = new Date();
	let baseTime = new Date();
	let currentTime = new Date();
	$: shownTime = new Date(currentTime - baseTime);

	let pastTimes = [];
	$: reversedPastTimes = (() => {
		let temp = pastTimes.slice();
		temp.reverse();
		return temp;
	})();

	$: totalTime = new Date(currentTime - openTime);
	$: sumPastTime = new Date(pastTimes.reduce((p, c) => p + c.valueOf(), 0));
	let showSumTime = false;

	setInterval(() => {
		currentTime = new Date();
	}, 0.01);

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

	function toggleTotalView() {
		showSumTime = !showSumTime;
	}

	enableWakeLock();
</script>

<div class="container">
	<div class="timer-display" on:click={reset}>
		{formatTime(shownTime)}
	</div>
	<div class="past-times" on:click={reset}>
		{#each reversedPastTimes as p}
			<div class="past-time">{formatTime(p)}</div>
		{/each}
	</div>
	<div class="total-display" on:click={toggleTotalView}>
		{showSumTime ? formatTime(sumPastTime) : formatTime(totalTime)}
	</div>
	<footer>Copyright © Earnest Bits LLC, 2022</footer>
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-rows: 256px calc(100% - 256px - 24px - 64px) 64px 24px;
		height: 100%;
		box-sizing: border-box;
	}

	.timer-display {
		display: flex;
		align-items: center;
		font-size: 128px;
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
		height: 100%;
	}

	.total-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #aaa;
		font-size: 24px;
		cursor: pointer;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		color: #ccc;
		font-size: 12px;
		height: 100%;
	}
</style>
