import React from 'react';

type SelectOptions = {
    value: string;
    label: string;
};

type SelectMenuProps = {
    options: SelectOptions[];
    value?: SelectOptions;
    onChange: (value?: SelectOptions) => void;
}

export default function SelectMenu({ value, options, onChange }: SelectMenuProps) {
  return (
    <div>
      
    </div>
  );
}
