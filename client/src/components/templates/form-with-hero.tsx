import React, { Children } from 'react';
import { Card, CardContent } from '../atoms/card';

interface FormWithHeroProps extends React.ComponentProps<'div'> {
    heroImage: string;
    children?: React.ReactNode;
}



const FormWithHero: React.FC<FormWithHeroProps> = ({ heroImage, children }) => {
    return (
        <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={heroImage}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-muted"
            />
          </div>
            
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
                {children}
            </div>
          </form>
        
        </CardContent>
      </Card>
    );
};

export default FormWithHero;