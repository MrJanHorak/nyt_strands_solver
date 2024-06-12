"use client";
import { useEffect, useState } from "react";
import BetButton from "./_components/BetButton";
import {
  findOddPointVal,
  computeUnfairVigOdds,
  computeAmericanOdds,
  computeAlgoOdds,
  findEV,
  checkForName,
  filterData,
} from "@/lib/evutils";
import BetList from "./_components/BetList";
import { NextResponse } from "next/server";
/* -------------------- API Key -------------------- */
const apiKey = process.env.NEXT_PUBLIC_ODDS_API_KEY;
/* -------------------- API Fetch Parameters -------------------- */
const sport = "basketball_nba";
// const sport = "baseball_mlb";
const regions = "us,us2,eu";
const markets = "player_points";
// const markets = "pitcher_strikeouts";
const oddsFormat = "decimal";
const dateFormat = "iso";
/* -------------------- Book Data -------------------- */
let pev_bets: any = [];
// compute the positive expected values of the bets
export function computeEV(bets: any) {
  let betObj;
   ....
   ....
    // create new bet object for the over's and under's
    if (
      (overEV > 0 || underEV > 0) &&
      !checkForName(betObj, pev_bets) &&
      !pev_bets.includes(betObj)
    ) {
      pev_bets.push(betObj);
    }
  });
  return pev_bets;
}
const Page = () => {
  const [pevBets, setPevBets] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  async function getBets() {
    setPevBets([]);
    const retVal = await getEventIds();
    return retVal;
  }
  /* -------------------- Functions -------------------- */
  // get the current event ids
  async function getEventIds() {
    try {
      // const response = await fetch('/api2/evts', {
      //   method: 'GET',
      // })
      // if (!response.ok) {
      //   throw new Error('Failed to send message')
      // }
      let response = await fetch(
        https://api.the-odds-api.com/v4/sports/${sport}/events?apiKey=${apiKey},
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // initialize the event ID's array
      const evtIds: any = [];
      // save each event id in an array
      data.forEach((evt: any) => {
        evtIds.push(evt.id);
      });
      // call the getAllEvents function with the avent IDs
      await getAllEvents(evtIds);
      return NextResponse.json("Success", { status: 200 });
    } catch (err) {
      console.log("Error status", err);
    }
  }
  // get the events associate with each event id
  async function getAllEvents(evtIds: any) {
    // send an API request to each event id
    await evtIds.forEach(async (id: any) => {
    try {
      const response = await fetch(
        https://api.the-odds-api.com/v4/sports/${sport}/events/${id}/odds?apiKey=${apiKey}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}&dateFormat=${dateFormat}
      );
      let data = await response.json();
      filterData(data);
    } catch (err: any) {
      console.log("Error status", err.response.status);
    }
    });
    setPevBets(pev_bets);
    setLoading(false);
  }
  // render the page once on state change
  useEffect(() => {}, [pevBets]);
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="my-4 w-1/4 flex items-center">
          <BetButton getBets={getBets} />
        </div>
        <div>Click the button to generate PEV bets</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-4 w-1/4 flex items-center">
        <BetButton getBets={getBets} />
      </div>
      {pevBets.length === 0 ? (
        <div>No PEV Bets</div>
      ) : (
        <div>
          <BetList bets={pevBets} />
        </div>
      )}
    </div>
  );
};
export default Page; (edited) 