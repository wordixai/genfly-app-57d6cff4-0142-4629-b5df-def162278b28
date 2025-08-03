import { useMeditationStore } from '@/stores/meditationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const SessionInfo = () => {
  const { currentSession, setCurrentSession } = useMeditationStore();
  
  if (!currentSession) return null;
  
  return (
    <Card className="zen-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-zen-700">
              {currentSession.title}
            </CardTitle>
            <CardDescription className="text-zen-600">
              {currentSession.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSession(null)}
            className="h-8 w-8 p-0 hover:bg-zen-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zen-500">{currentSession.category}</span>
          <span className="text-zen-600 font-medium">
            {currentSession.duration} minutes
          </span>
        </div>
      </CardContent>
    </Card>
  );
};