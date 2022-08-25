import classes from "./About.module.css";
const About = () => {
  return (
    <div className={classes.about}>
      <h2>About</h2>
      <span className={classes.card}>
        <p>
          When your business automates and integrates expense management, you
          can capture spending from multiple sources, plan and make spending
          decisions based on accurate data, reimburse employees more quickly,
          and simplify the expense reporting process for everyone.
        </p>
      </span>
    </div>
  );
};

export default About;
