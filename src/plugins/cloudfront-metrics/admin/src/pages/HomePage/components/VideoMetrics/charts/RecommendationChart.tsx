import { Combobox, ComboboxOption, Card } from "@strapi/design-system";
import { User, WatchedVideo } from "../../../interfaces";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

const RecommendationChart = ({ users }: { users: User[] }) => {
  const [user, setUser] = useState<User>({
    id: '',
    "watched-categories": [],
  });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (user.id !== '') {
      setKey(key + 1);
    }
  }, [user]);

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false
        },
      },
    }
  };

  const data = {
    labels: user["watched-categories"]?.map((category: WatchedVideo) => category.name) || [''],
    datasets: [
      {
        label: 'Views',
        data: user["watched-categories"]?.map((category: WatchedVideo) => category.value) || [''],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  return (
    <Card style={{ padding: '1em' }}>
      <Combobox
        label="Select a user"
        value={user}
        onChange={(value) => {
          setUser(users.find((user: User) => user.id === value) || user);
        }}
        autocomplete={'both'}
      >
        {users.map((user: User) => (<ComboboxOption key={`user-${user.id}`} value={user.id}>{user.id}</ComboboxOption>))}
      </Combobox>
      <Bar style={{ paddingTop: '1em' }} data={data} options={options} />
    </Card>
  );
}

export default RecommendationChart;
