import { Mail, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const TeamCard = ({ member }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const socialLinks = member.social || [];
  const linkedIn = socialLinks.find((s) => s.platform === 'linkedin');

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-heading text-lg font-semibold mb-1">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
        <div className="flex justify-center gap-2">
          {member.email && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-9 w-9"
            >
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
          {linkedIn && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="h-9 w-9"
            >
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
