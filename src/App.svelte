<script lang="ts">
  import Auction from "./Auction.svelte";
</script>

<style type="text/scss">
  main {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: orange;
    font-size: 100px;

    img {
      width: 300px;
      height: 300px;
    }
  }
</style>

<main>
  <Auction />
</main>
