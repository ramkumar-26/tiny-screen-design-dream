
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SHGInfoCardProps {
  title: string;
  children: React.ReactNode;
}

const SHGInfoCard: React.FC<SHGInfoCardProps> = ({ title, children }) => {
  return (
    <Card className="mb-4 overflow-hidden border border-gray-200 shadow-md rounded-xl">
      <div className="bg-gradient-to-r from-shg-primary to-shg-secondary py-3.5 px-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default SHGInfoCard;
