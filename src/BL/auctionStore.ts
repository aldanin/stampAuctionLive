import { writable, Writable } from 'svelte/store';
import { ExhibitModel, Bid } from './exhibit.model';
import { exhibitsArray } from './exhibitsArray';

const auctionStore: Writable<AuctionStoreModel> = writable<AuctionStoreModel>({
    exhibits: exhibitsArray,
    user: {
        id: '1',
        name: 'alon'
    }
});

const auctionService = {
    subscribe: auctionStore.subscribe,
    updateBid: (bid: Bid) => {
        auctionStore.update((state) => {
            const foundExibitIndex = state.exhibits.findIndex(
              (ex) => ex.id === bid.exhibitId
            );
            const foundExhibit: ExhibitModel = state.exhibits[foundExibitIndex];
            foundExhibit.currentBid = bid.bid;
            foundExhibit.bidderId = bid.bidderId;
            foundExhibit.bidCount = isNaN(foundExhibit.bidCount)
              ? 1
              : foundExhibit.bidCount + 1;
            console.log(foundExhibit.bidCount);
            if (foundExhibit.bidCount === 3) {
              foundExhibit.isSold = true;
              state.exhibits.forEach((ex) => {
                ex.isOnSale = false;
              });
              state.exhibits[foundExibitIndex + 1].isOnSale = true;
            }
      
            return { ...state, exhibits: state.exhibits };
          });
    }
}

export type AuctionStoreModel = {
    exhibits: ExhibitModel[],
    user: {
        id: string,
        name: string
    }
}

export default auctionService;