import styles from "./CountryItem.module.css";

function CountryItem(Props) {
  const countries = Props.country;
  return (
    <li className={styles.countryItem}>
      <span>{countries.emoji}</span>
      <span>{countries.country}</span>
    </li>
  );
}

export default CountryItem;
