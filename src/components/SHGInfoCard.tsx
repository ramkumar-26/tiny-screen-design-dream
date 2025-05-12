
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SHGInfoCardProps {
  title: string;
  children: React.ReactNode;
}

const SHGInfoCard: React.FC<SHGInfoCardProps> = ({ title, children }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <h2 className="text-xl font-bold text-red-500 text-center py-3">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
};

export default SHGInfoCard;
