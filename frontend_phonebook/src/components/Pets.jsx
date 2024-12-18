const Pets = ({pets}) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Type of Pet</th>
        <th>Age</th>
      </tr>
      {pets.map((pet) => {
        return (
          <tr>
            <td>
              {pet.name}
            </td>
            <td>
              {pet.animal}
            </td>
            <td>
              {pet.age}
            </td>
          </tr>
        );
      })}
    </table>
  );
}

export default Pets;