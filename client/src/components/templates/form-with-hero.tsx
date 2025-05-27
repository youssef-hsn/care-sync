import React from 'react';
import { Card, CardContent } from '../atoms/card';

interface FormWithHeroProps extends React.ComponentProps<'form'> {
    heroImage: string;
    children?: React.ReactNode;
}

const FormWithHero: React.FC<FormWithHeroProps> = ({ heroImage, children, ...formProps }) => {
    return (
        <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={heroImage}
              className="absolute inset-0 h-full w-full object-cover bg-muted"
            />
          </div>
            
          <form className="p-6 md:p-8" {...formProps}>
            <div className="flex flex-col gap-6">
                {children}
            </div>
          </form>
        
        </CardContent>
      </Card>
    );
};

export default FormWithHero;