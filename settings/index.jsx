function settings(props) {
  return (
    <Page>
      
      <Toggle
        label={'Show Battery Percentage'}
        settingsKey="hideBat"
      />
      
      <Section title={<Text bold>Hour Hand Color</Text>}>
        <ColorSelect
          settingsKey="hourHand"
          colors={[
            {color: 'darkcyan'},
            {color: 'tomato'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'plum'},
            {color: 'orange'},
            {color: 'darkseagreen'},
            {color: 'floralwhite'},
            {color: 'indianred'},
            {color: 'lavender'},
            {color: 'hotpink'},
            {color: 'lightblue'},
            {color: 'palevioletred'},
            {color: 'seagreen'}
          ]}
        />
      </Section>
      <Section title={<Text bold>Minute Hand Color</Text>}>
        <ColorSelect
          settingsKey="minuteHand"
          colors={[
            {color: 'darkcyan'},
            {color: 'tomato'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'plum'},
            {color: 'orange'},
            {color: 'darkseagreen'},
            {color: 'floralwhite'},
            {color: 'indianred'},
            {color: 'lavender'},
            {color: 'hotpink'},
            {color: 'lightblue'},
            {color: 'palevioletred'},
            {color: 'seagreen'}
          ]}
        />
      </Section>
      <Section title={<Text bold>Second Hand Color</Text>}>
         <ColorSelect
          settingsKey="secondHand"
         colors={[
            {color: 'darkcyan'},
            {color: 'tomato'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'plum'},
            {color: 'orange'},
            {color: 'darkseagreen'},
            {color: 'floralwhite'},
            {color: 'indianred'},
            {color: 'lavender'},
            {color: 'hotpink'},
            {color: 'lightblue'},
            {color: 'palevioletred'},
            {color: 'seagreen'}
          ]}
        />
      </Section>
      
      <Section title={<Text bold>Choose Your Stats</Text>}>
        <Toggle
          label={'Show Heart Rate'}
          settingsKey="heartRate"
        />
        <Toggle
          label={'Show Calories'}
          settingsKey="calories"
        />
        <Toggle
          label={'Show Step Count'}
          settingsKey="stepCount"
        />
        <Toggle
          label={'Show Floor Count'}
          settingsKey="floorCount"
        />
        <Toggle
          label={'Show Active Zone Minutes'}
          settingsKey="azm"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(settings);