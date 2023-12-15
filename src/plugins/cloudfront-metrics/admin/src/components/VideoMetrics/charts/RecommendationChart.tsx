import { Combobox, ComboboxOption, Card, CardHeader, CardContent } from "@strapi/design-system";
import { User, WatchedVideo } from "../../../interfaces";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import  {Theme} from "../../../interfaces"
import {darkTheme } from "@strapi/design-system"
const customDarkTheme: Theme = darkTheme;

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
        borderColor: customDarkTheme.colors.primary600,
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  return (
    <Card style={{ padding: '1em' }}>
      <CardHeader style={{ height: '20%', alignItems: 'center', justifyContent: 'center' }}>
        <Combobox
          label="Select a user"
          value={user}
          onChange={(value: any) => {
            setUser(users.find((user: User) => user.id === value) || user);
          }}
          autocomplete={'both'}
        >
          {users.map((user: User) => (<ComboboxOption key={`user-${user.id}`} value={user.id}>{user.id}</ComboboxOption>))}
        </Combobox>
      </CardHeader>
      <CardContent>
        <Bar style={{ paddingTop: '1em' }} data={data} options={options} />
      </CardContent>
    </Card>
  );
}

export default RecommendationChart;
