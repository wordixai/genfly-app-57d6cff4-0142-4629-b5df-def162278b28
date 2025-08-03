import { TimerCircle } from '@/components/meditation/TimerCircle';
import { DurationSelector } from '@/components/meditation/DurationSelector';
import { GuidedSessions } from '@/components/meditation/GuidedSessions';
import { AmbientSounds } from '@/components/meditation/AmbientSounds';
import { SessionInfo } from '@/components/meditation/SessionInfo';
import { useMeditationStore } from '@/stores/meditationStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { currentSession } = useMeditationStore();
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-zen-600 to-zen-800 bg-clip-text text-transparent">
            Zen Timer
          </h1>
          <p className="text-zen-600 text-lg max-w-2xl mx-auto">
            Find your inner peace with guided meditations, customizable timers, and ambient sounds
          </p>
        </header>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex justify-center">
              <TimerCircle />
            </div>
            
            {currentSession && <SessionInfo />}
            
            <DurationSelector />
            
            <AmbientSounds />
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="guided" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/60 backdrop-blur-sm">
                <TabsTrigger 
                  value="guided"
                  className="data-[state=active]:bg-zen-500 data-[state=active]:text-white"
                >
                  Guided Sessions
                </TabsTrigger>
                <TabsTrigger 
                  value="insights"
                  className="data-[state=active]:bg-zen-500 data-[state=active]:text-white"
                >
                  Meditation Tips
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guided" className="mt-0">
                <GuidedSessions />
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-zen-700 mb-6">
                    Meditation Tips & Insights
                  </h2>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Finding Your Posture",
                        content: "Sit comfortably with your spine straight but not rigid. Rest your hands naturally on your knees or in your lap.",
                        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                      },
                      {
                        title: "Breathing Awareness",
                        content: "Focus on your natural breath. Don't try to control it, just observe the sensation of breathing in and out.",
                        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop"
                      },
                      {
                        title: "Dealing with Thoughts",
                        content: "When thoughts arise, acknowledge them without judgment and gently return your attention to your breath or chosen focus.",
                        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
                      },
                      {
                        title: "Consistency Over Duration",
                        content: "It's better to meditate for 5 minutes daily than 30 minutes once a week. Build a sustainable practice.",
                        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop"
                      }
                    ].map((tip, index) => (
                      <div key={index} className="zen-card p-6 space-y-4">
                        <img
                          src={tip.image}
                          alt={tip.title}
                          className="w-full h-32 object-cover rounded-2xl"
                        />
                        <h3 className="text-lg font-semibold text-zen-700">
                          {tip.title}
                        </h3>
                        <p className="text-zen-600 text-sm leading-relaxed">
                          {tip.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;