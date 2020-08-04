<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Exhibit from "./Exhibit.svelte";
  import type { ExhibitModel, Bid } from "./BL/exhibit.model";
  import { exhibitsArray } from "./BL/exhibitsArray";
  import type { AuctionStoreModel } from "./BL/auctionStore";
  import auctionStore from "./BL/auctionStore";
  import Crazy from './Crazy.svelte';

  let exhibits: ExhibitModel[] = exhibitsArray;
  let unsubscribe;

  onMount(() => {
    unsubscribe = auctionStore.subscribe((state: AuctionStoreModel) => {
      exhibits = state.exhibits;
    });
  });

  onDestroy(() => {});

  function onBidSubmitted(event) {
    const bid: Bid = event.detail;
    console.log("auction", event);

    auctionStore.updateBid(bid); 
    
  }
</script>

<style type="text/scss">
  .auction-wrap {
    height: 100%;

    .exhibit-wrap {
      padding: 20px;
    }
  }
</style>

<div class="auction-wrap">
  {#each exhibits as exhibit}
    <div class="exhibit-wrap">
      <Crazy goCrazy={exhibit.isSold}><Exhibit {exhibit} on:bidSubmitted={onBidSubmitted} /></Crazy>
    </div>
  {/each}
</div>
