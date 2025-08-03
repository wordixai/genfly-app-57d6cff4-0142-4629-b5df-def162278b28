import { useMeditationStore } from '@/stores/meditationStore';
import { Button } from '@/components/ui/button';

const durations = [3, 5, 10, 15, 20, 30];

export const DurationSelector = () => {
  const { timer, setDuration } = useMeditationStore();
  
  return (
    <div className="zen-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-center text-zen-700">
        Choose Duration
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {durations.map((duration) => (
          <Button
            key={duration}
            onClick={() => setDuration(duration)}
            variant={timer.selectedDuration === duration ? "default" : "outline"}
            className={
              timer.selectedDuration === duration
                ? "zen-button"
                : "zen-button-secondary"
            }
          >
            {duration}m
          </Button>
        ))}
      </div>
    </div>
  );
};