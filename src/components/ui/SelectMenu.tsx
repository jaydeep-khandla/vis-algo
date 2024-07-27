// import React from 'react';

type SelectOptions = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  options?: SelectOptions[];
  value?: SelectOptions;
  onChange?: (value?: SelectOptions) => void;
};

export default function SelectMenu({
  options,
  value,
  onChange,
}: SelectMenuProps) {
  return (
    <div className="bg-[#E39828] flex gap-1 cursor-pointer font-mono font-black text-lg px-[1.3em] py-[0.6em] border-2 border-solid border-[#0B3F30] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] hover:shadow-[0.2em_0.2em] active:translate-x-[0.05em] active:translate-y-[0.05em] active:shadow-[0.1em_0.1em] transition-all">
      <button>&times;</button>
      <div className="h-full w-[1px] bg-black"></div>
      <div className="">v</div>
      <ul className="px-2 bg-[#E39828] h-fit hidden">
        {options?.map((option) => (
          <li
            key={option.value}
            value={option.value}
            className="mx-10 bg-[#E39828]"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
