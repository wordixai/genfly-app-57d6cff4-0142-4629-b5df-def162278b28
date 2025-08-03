import { useMeditationStore } from '@/stores/meditationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const GuidedSessions = () => {
  const { guidedSessions, setCurrentSession, currentSession } = useMeditationStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-zen-700">
        Guided Meditations
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guidedSessions.map((session) => (
          <Card
            key={session.id}
            className={`zen-card cursor-pointer transition-all duration-300 hover:scale-105 ${
              currentSession?.id === session.id ? 'ring-2 ring-zen-500' : ''
            }`}
            onClick={() => setCurrentSession(session)}
          >
            {session.imageUrl && (
              <div className="relative h-32 overflow-hidden rounded-t-3xl">
                <img
                  src={session.imageUrl}
                  alt={session.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-zen-700">{session.title}</CardTitle>
                <span className="text-xs bg-zen-100 text-zen-600 px-2 py-1 rounded-full">
                  {session.duration}m
                </span>
              </div>
              <CardDescription className="text-sm text-zen-600">
                {session.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zen-500 font-medium">
                  {session.category}
                </span>
                <Button
                  size="sm"
                  className="zen-button h-8 px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSession(session);
                  }}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};