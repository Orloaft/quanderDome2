export const TeamSelect = ({
  toggleTeam,
  team,
}: {
  toggleTeam: any;
  team: number;
}) => {
  return (
    <select
      name="team"
      onChange={(e) => {
        const { name, value } = e.target;
        toggleTeam({ name: name, value: value });
      }}
      defaultValue={team}
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
  );
};
