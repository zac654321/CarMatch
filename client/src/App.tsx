import { Suspense, useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";
import CardGame from "./components/CardGame";

function App() {
  const { setHitSound, setSuccessSound } = useAudio();

  // Load audio files on component mount
  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Load hit sound for card flips
        const hitAudio = new Audio('/sounds/hit.mp3');
        hitAudio.preload = 'auto';
        setHitSound(hitAudio);

        // Load success sound for matches
        const successAudio = new Audio('/sounds/success.mp3');
        successAudio.preload = 'auto';
        setSuccessSound(successAudio);

        console.log('Audio files loaded successfully');
      } catch (error) {
        console.log('Error loading audio files:', error);
      }
    };

    loadAudio();
  }, [setHitSound, setSuccessSound]);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Car Guess Game...</div>
      </div>
    }>
      <CardGame />
    </Suspense>
  );
}

export default App;
