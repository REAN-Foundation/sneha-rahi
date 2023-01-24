<script>
	export let right= 19;
	export let top = 100;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			// left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
		position: absolute;
	}
</style>

<div on:mousedown={onMouseDown} style="right: {right}px; top: {top}px;" class="card card-compact touch-auto card-bordered w-[375px] h-[590px] select-none cursor-move bg-base-100  rounded-none rounded-t-[44px] shadow-sm overflow-auto"> 
<div class="card-body ">
<!-- <section > -->
	<slot></slot>
<!-- </section> -->
</div>
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />