import React, { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';

interface DropdownProps {
  buttonText: string;
  items: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

export const Dropdown = ({
  buttonText,
  items,
  selectedValue,
  onSelect,
  placeholder,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    toggleDropdown();
    onSelect(item);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        type="button"
        className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center border border-gray-300 outline-gray-300 bg-white w-full"
        onClick={toggleDropdown}
      >
        <span className="flex-grow">{selectedValue || placeholder}</span>
        <div className={`${(isOpen ? 'rotate-180' : '')}`}>
          <ArrowDropDown />
        </div>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="bg-white rounded-lg shadow w-full absolute"
        >
          <ul
            className="text-sm text-black"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item, index) => (
              <li key={index}>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedValue === item ? 'bg-gray-100 text-black' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
