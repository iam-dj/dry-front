import React, { useState, useEffect, useCallback } from "react";
import pokevideo from "./assets/pokeVideo.mp4";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import Toast from "react-bootstrap/Toast";
import tm from "./assets/tm.png";

export default function Catch(props) {
  const movesArray = [
    "Pound",
    "Karate Chop",
    "Double Slap",
    "Comet Punch",
    "Mega Punch",
    "Pay Day",
    "Fire Punch",
    "Ice Punch",
    "Thunder Punch",
    "Scratch",
    "Vice Grip",
    "Guillotine",
    "Razor Wind",
    "Swords Dance",
    "Cut",
    "Gust",
    "Wing Attack",
    "Fly",
    "Bind",
    "Slam",
    "Vine Whip",
    "Stomp",
    "Double Kick",
    "Mega Kick",
    "Jump Kick",
    "Rolling Kick",
    "Sand Attack",
    "Headbutt",
    "Horn Attack",
    "Fury Attack",
    "Horn Drill",
    "Tackle",
    "Body Slam",
    "Wrap",
    "Take Down",
    "Thrash",
    "Double-Edge",
    "Tail Whip",
    "Poison Sting",
    "Twineedle",
    "Leer",
    "Bite",
    "Growl",
    "Roar",
    "Sing",
    "Supersonic",
    "Sonic Boom",
    "Disable",
    "Acid",
    "Ember",
    "Flamethrower",
    "Mist",
    "Water Gun",
    "Hydro Pump",
    "Surf",
    "Ice Beam",
    "Blizzard",
    "Psybeam",
    "Bubble Beam",
    "Aurora Beam",
    "Hyper Beam",
    "Peck",
    "Drill Peck",
    "Submission",
    "Low Kick",
    "Counter",
    "Seismic Toss",
    "Strength",
    "Absorb",
    "Mega Drain",
    "Leech Seed",
    "Growth",
    "Razor Leaf",
    "Solar Beam",
    "Poison Powder",
    "Stun Spore",
    "Sleep Powder",
    "Petal Dance",
    "String Shot",
    "Dragon Rage",
    "Sonic Boom",
    "Twineedle",
    "Pin Missile",
    "Bug Bite",
    "Bite",
    "Swords Dance",
    "Cut",
    "Gust",
    "Wing Attack",
    "Fly",
    "Grass",
    "Slam",
    "Vine Whip",
    "Stomp",
    "Double Kick",
    "Mega Kick",
    "Jump Kick",
    "Rolling Kick",
    "Sand Attack",
    "Headbutt",
    "Leech Life",
    "Night Shade",
    "Mimic",
    "Screech",
    "Double Team",
    "Recover",
    "Harden",
    "Minimize",
    "Smokescreen",
    "Confuse Ray",
    "Withdraw",
    "Defense Curl",
    "Barrier",
    "Light Screen",
    "Haze",
    "Reflect",
    "Focus Energy",
    "Bide",
    "Metronome",
    "Mirror Move",
    "Egg Bomb",
    "Lick",
    "Smog",
    "Sludge",
    "Bone Club",
    "Fire Blast",
    "Waterfall",
    "Clamp",
    "Swift",
    "Skull Bash",
    "Spike Cannon",
    "Constrict",
    "Amnesia",
    "Kinesis",
    "Soft-Boiled",
    "High Jump Kick",
    "Glare",
    "Dream Eater",
    "Poison Gas",
    "Barrage",
    "Leech Life",
    "Lovely Kiss",
    "Sky Attack",
    "Transform",
    "Bubble",
    "Dizzy Punch",
    "Spore",
    "Flash",
    "Psywave",
    "Splash",
    "Acid Armor",
    "Crabhammer",
    "Explosion",
    "Fury Swipes",
    "Bonemerang",
    "Rest",
    "Rock Slide",
    "Hyper Fang",
    "Sharpen",
    "Conversion",
    "Tri Attack",
    "Super Fang",
    "Slash",
    "Substitute",
    "Struggle",
    "Sketch",
    "Triple Kick",
    "Thief",
    "Spider Web",
    "Mind Reader",
    "Nightmare",
    "Flame Wheel",
    "Snore",
    "Curse",
    "Flail",
    "Conversion 2",
    "Aeroblast",
    "Cotton Spore",
    "Reversal",
    "Spite",
    "Flame Charge",
    "Volt Tackle",
    "Aqua Tail",
    "Leaf Blade",
    "Focus Energy",
    "Psycho Cut",
    "Icicle Crash",
    "Zap Cannon",
    "Stone Edge",
    "Last Resort",
    "Zen Headbutt",
    "Shadow Claw",
    "X-Scissor",
    "Aqua Jet",
    "Psyshock",
    "Flame Burst",
    "Wild Charge",
    "Play Rough",
    "Close Combat",
    "Night Daze",
    "Future Sight",
    "Close Combat",
    "Thunder Fang",
    "Fire Fang",
    "Water Pulse",
    "Rock Slide",
    "Air Cutter",
    "Discharge",
    "Hyper Voice",
    "Energy Ball",
    "Psychic",
    "Dark Pulse",
    "Rock Climb",
    "Leaf Storm",
    "Flash Cannon",
    "Waterfall",
    "Psycho Cut",
    "Draco Meteor",
    "Iron Head",
    "Moonblast",
    "Psychic Fangs",
    "Stomping Tantrum",
    "Shadow Claw",
    "Fly",
    "Bulldoze",
    "Shadow Bone",
    "Zing Zap",
    "Wild Charge",
    "Bug Buzz",
    "Close Combat",
    "Avalanche",
    "Low Sweep",
    "U-turn",
    "Liquidation",
    "Throat Chop",
    "Psyshock",
    "Volt Switch",
    "Circle Throw",
    "Leaf Tornado",
    "Gear Grind",
    "Hydro Pump",
    "Fire Blast",
    "Thunderbolt",
    "Solar Beam",
    "Psychic",
    "Ice Beam",
    "Close Combat",
    "Flamethrower",
    "Surf",
    "Hyper Beam",
    "Solar Beam",
    "Thunder",
    "Fire Blast",
    "Hydro Pump",
    "Psychic",
    "Ice Beam",
    "Close Combat",
    "Flamethrower",
    "Surf",
    "Hyper Beam",
    "Water Pulse",
    "Thunder Punch",
    "Ice Punch",
    "Fire Punch",
    "Bug Bite",
    "Feint Attack",
    "Metal Claw",
    "Play Rough",
    "Discharge",
    "Aqua Tail",
    "Seed Bomb",
    "Flare Blitz",
    "X-Scissor",
    "Rock Slide",
    "Icicle Crash",
    "Wild Charge",
    "Heat Wave",
    "Waterfall",
    "Psychic",
    "Earthquake",
    "Thunderbolt",
    "Fury Cutter",
    "Iron Head",
    "Stone Edge",
    "Hyper Voice",
    "Blizzard",
    "Surf",
    "Fire Blast",
    "Psywave",
    "Shock Wave",
    "Signal Beam",
    "Shadow Ball",
    "Close Combat",
    "Power Gem",
    "Hydro Pump",
    "Flamethrower",
    "Bug Buzz",
    "Air Slash",
    "Discharge",
    "Iron Tail",
    "Psychic",
    "Rock Slide",
    "Cross Chop",
    "Shadow Punch",
    "Thunderpunch",
    "Giga Impact",
    "Bug Bite",
    "Dazzling Gleam",
    "Thunder",
    "Ice Beam",
    "Psyshock",
    "Flash Cannon",
    "Hyper Fang",
    "Fire Punch",
    "Surf",
    "Psychic Fangs",
    "Earthquake",
    "Hurricane",
    "Thunderbolt",
    "Energy Ball",
    "Close Combat",
    "Blizzard",
    "Iron Head",
    "Facade",
    "Volt Tackle",
    "Leaf Storm",
    "Earth Power",
    "Stone Edge",
    "Crunch",
    "Flamethrower",
    "Hydro Pump",
    "Thunder",
    "Solar Beam",
    "Psychic",
    "Shadow Ball",
    "Ice Beam",
    "Close Combat",
    "Flare Blitz",
    "Leaf Blade",
    "X-Scissor",
    "Shadow Punch",
    "Grass Knot",
    "Discharge",
    "Psycho Cut",
    "Rock Wrecker",
    "Discharge",
    "Shadow Claw",
    "Focus Blast",
    "Energy Ball",
    "Brave Bird",
    "Return",
    "Water Pulse",
    "Psychic",
    "Aqua Tail",
    "Bug Buzz",
    "Hyper Voice",
    "Dark Pulse",
    "Earth Power",
    "Stone Edge",
    "Close Combat",
    "Ice Shard",
    "Outrage",
    "Confusion",
    "Quick Attack",
    "Aerial Ace",
    "Thunder Shock",
    "Dig",
    "Meteor Mash",
    "Disarming Voice",
    "Fire Spin",
    "Poison Fang",
    "Giga Drain",
    "Sludge Bomb",
    "Cross Poison",
    "Mud-Slap",
    "Magnitude",
    "Extreme Speed",
    "Brick Break",
    "Dynamic Punch",
    "Power Whip",
    "Acid Spray",
    "Rock Throw",
    "Spark",
    "Mud Bomb",
    "Gunk Shot",
    "Icicle Spear",
    "Self-Destruct",
    "Rage",
    "Twister",
  ];

  const [isFetching, setIsFetching] = useState(false);
  const [isToast, setIsToast] = useState("");
  const [isTrainer, setIsTrainer] = useState();
  const [showA, setShowA] = useState(true);
  const [showPoke, setShowPoke] = useState("");
  const pokeBallImageUrl =
    "https://archives.bulbagarden.net/media/upload/thumb/5/5b/TM_artwork_RTDX.png/120px-TM_artwork_RTDX.png";
  const [hasChances2, setHasChances2] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToastClick = () => {
    setShowToast(true);
  };
  const toggleShowA = () => {
    setIsToast("");
    setShowA(false);
  };

  const decrementChances = useCallback(async () => {
    setHasChances2((prevChances) => Math.max(prevChances - 2, 0));

    try {
      await API.getSubtractSpins(props.trainerId);
    } catch (error) {
      console.log(error);
    }
  }, [props.trainerId]);

  useEffect(() => {
    setShowPoke(tm);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spinData = await API.getNumSpins(props.trainerId);
        // console.log("spinData", spinData);
        // console.log("");

        if (spinData.numSpins === 0) {
          setHasChances2(0);
        } else {
          setHasChances2(spinData.numSpins);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (hasChances2 > 0) {
      try {
        setIsFetching(true);

        const randMove =
          movesArray[Math.floor(Math.random() * movesArray.length)];

        await API.getMove(props.trainerId, randMove);

        const data = await API.getOneTrainer(props.trainerId);

        setIsTrainer(data);

        decrementChances();

        setTimeout(() => {
          setShowPoke(pokeBallImageUrl);
          setIsToast("");
          setButtonDisabled(true);
        }, 5000);

        setTimeout(() => {
          setIsFetching(false);
          setIsToast(`Your new move is ${randMove}`);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No more chances left!");
    }
  }, [props.trainerId, hasChances2, decrementChances]);

  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);

  useEffect(() => {
    const fetchNumSpins = async () => {
      try {
        const spinData = await API.getNumSpins(props.trainerId);
        setHasChances2(spinData.numSpins || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNumSpins();
  }, [props.trainerId]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 300,
          backgroundColor: "#dc3545",
          padding: "5px",
          borderRadius: "5px",
          color: "white",
        }}
      >
        <p style={{ fontWeight: "bold" }}># of spin(s) left:</p>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "300%",
            background: "white",
            color: "black",
          }}
        >
          {hasChances2 >= 0 ? hasChances2 : 0}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <video
          src={pokevideo}
          type="video/mp4"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Toast className="mx-auto">
                <Toast.Body
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    color: "black",
                    textAligh: "center",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: "155%" }}>
                      {isToast}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={showPoke}
                      alt="Pokemon"
                    />
                  </div>
                </Toast.Body>
              </Toast>
              <Button
                className="btn-danger mx-auto"
                variant="secondary"
                id="dropdown-battle"
                onClick={handleButtonClick}
                disabled={isFetching || hasChances2 === 0}
              >
                {isFetching ? (
                  <img
                    src="https://media3.giphy.com/media/dGD5YHl8xW6c/giphy.gif?cid=ecf05e479h8f5shzhb7oypucnalyj5v7bg5quyve5p2dpznb&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="fetching-pokemon"
                  />
                ) : (
                  "Get a New Move for 2 Spins"
                )}
              </Button>
              <div>
                <button onClick={handleToastClick}>Show Instructions</button>
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                  <Toast.Header>
                    <strong className="mr-auto">Instructions</strong>
                  </Toast.Header>
                  <Toast.Body>
                  It's time to get a new TM! Click the but and give it a
                    spin! Note: It costs 2 spins per click -- if you want to
                    earn more spins go train or battle gym masters!
                  </Toast.Body>
                </Toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
