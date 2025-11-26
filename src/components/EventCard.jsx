import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from './Image';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.slug.current}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full group">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
          {event.isFeatured && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-heading text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </div>
            {event.venue && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{event.venue}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
