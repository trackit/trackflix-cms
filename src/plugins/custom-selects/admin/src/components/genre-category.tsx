import React, { CSSProperties, useEffect } from 'react';
import { SingleSelect, SingleSelectOption, MultiSelect } from '@strapi/design-system';
import { getFetchClient } from '@strapi/helper-plugin';
import pluginId from '../pluginId';
import { object, string } from 'prop-types';

const { get } = getFetchClient();

const containerStyle : CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const Category = ({onChange, disabled, selectedGenre, categoriesData }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);
  return (
    <SingleSelect
    label="Category"
    required
    placeholder={disabled ? 'select a Genre first' : 'Select a category'}
    hint="Choose a category that best describes your content."
    disabled={disabled}
    onChange={(e) => {onChange(e); setSelectedCategory(e)}}
    value={selectedCategory}
    >
      {categoriesData[selectedGenre] && categoriesData[selectedGenre].map((category) => (
        <SingleSelectOption key={category.id} value={category.Name}>
          {category.Name}
        </SingleSelectOption>
      ))}
  </SingleSelect>
  );
};

const Genre = ({ onChange, genresData } : {onChange: (e: any) => void, genresData: string[]}) => {
  const [selectedGenre, setSelectedGenre] = React.useState<string | undefined>(undefined);

  return (
    <SingleSelect
      label="Genre"
      required
      placeholder="Select a genre"
      onChange={async (e) => {onChange(e);setSelectedGenre(e)}}
      value={selectedGenre}

    >
      {genresData.length && genresData.map((genre) => (
        <SingleSelectOption key={genre} value={genre}>
          {genre}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  )
};


const GenreCategory = ({ field1, field2, value, onChange }) => {
  const [genre, setGenre] = React.useState<string | undefined>(undefined);
  const [category, setCategory] = React.useState<string | undefined>(undefined);
  const [genres, setGenres] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<{}>({});

  const setCategoryWrapper = (value) => {
    setCategory(value);
    onChange({
      target: {
        name: "category",
        value: value
      }
    })
  }

  const setGenreWrapper = (value) => {
    setGenre(value);
    onChange({
      target: {
      name: "genre",
      value: value
    },
  
  });
  }

  useEffect(() => {
    const fetchData = async () => {
      const categories = {}
      const response = await get(`/${pluginId}/genres`);
      const result = response.data.results
      const genresResults = Object.keys(result).map((key) => result[key].Name);
      setGenres(genresResults);
      Object.keys(result).map((key) => {
        categories[result[key].Name] = result[key].categories
      });
      console.log(categories)
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <div style={containerStyle}>
      <Genre
      onChange={setGenreWrapper}
      genresData={genres}
      />
      <Category
      onChange={setCategoryWrapper}
      disabled={genre === undefined}
      categoriesData={categories}
      selectedGenre={genre} />
    </div>
  );
};

export default GenreCategory;
