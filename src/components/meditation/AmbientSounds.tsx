import { useMeditationStore } from '@/stores/meditationStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientSounds = () => {
  const { ambientSounds, toggleAmbientSound, setAmbientVolume, stopAllAmbientSounds } = useMeditationStore();
  
  return (
    <Card className="zen-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-zen-700">Ambient Sounds</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={stopAllAmbientSounds}
            className="zen-button-secondary h-8"
          >
            <VolumeX className="w-4 h-4 mr-1" />
            Stop All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {ambientSounds.map((sound) => (
          <div key={sound.id} className="flex items-center space-x-3">
            <Button
              onClick={() => toggleAmbientSound(sound.id)}
              variant={sound.isPlaying ? "default" : "outline"}
              className={`w-12 h-12 rounded-full p-0 text-lg ${
                sound.isPlaying ? "zen-button" : "zen-button-secondary"
              }`}
            >
              {sound.icon}
            </Button>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zen-700">
                  {sound.name}
                </span>
                <Volume2 className="w-4 h-4 text-zen-500" />
              </div>
              
              <Slider
                value={[sound.volume * 100]}
                onValueChange={([value]) => setAmbientVolume(sound.id, value / 100)}
                max={100}
                step={1}
                className="w-full"
                disabled={!sound.isPlaying}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};