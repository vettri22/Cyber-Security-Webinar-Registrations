import { useState } from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutEvent from "./components/AboutEvent";
import GuestSpeaker from "./components/GuestSpeaker";
import EventCountdown from "./components/EventCountdown";
import Registration from "./components/Registration";
import Leadership from "./components/Leadership";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <BackgroundEffects />
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <AboutEvent />
            <GuestSpeaker />
            <EventCountdown />
            <Registration />
            <Leadership />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
