import React from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";

const CommunityGuidelines = () => {
  return (
    <div>
      <Base />
      <div className="communityGuidelinesContainer">
        <h1 className="boldLink">Commmunity Guidelines</h1>
        <ul className="guidelinesList">
          <li>
            <b>Accuracy and Authenticity:</b> Users must provide truthful
            information about their pets. False information or impersonation of
            others is strictly prohibited.
          </li>
          <li>
            <b>Privacy and Confidentiality:</b> Users should respect the privacy
            of others. Sharing personal information about other users without
            their consent is not allowed.
          </li>
          <li>
            <b>No Spamming or Advertising:</b> Users should refrain from
            spamming the platform with unnecessary information or
            advertisements. Wiggles is meant for genuine interactions and
            discussions about pets.
          </li>
          <li>
            <b>Content Guidelines:</b> Users are responsible for the content
            they post. Content that is inappropriate, offensive, or violates any
            laws or regulations will be removed.
          </li>
          <li>
            <b>Reporting Violations:</b> Users are encouraged to{" "}
            <a href="mailto:wigglesforpets@gmail.com" className="highlightText">
              report any violations
            </a>{" "}
            of the code of conduct to the platform administrators. Prompt action
            will be taken against offenders.
          </li>
          <li>
            <b>Consequences of Violations:</b> Violation of the code of conduct
            may result in warnings, temporary suspension, or permanent banning
            of the user's account, depending on the severity of the offense.
          </li>
          <li>
            <b>Continuous Improvement:</b> The code of conduct is subject to
            updates and improvements based on feedback from the community. Users
            are encouraged to{" "}
            <Link
              to="/verify/contact"
              target="_blank"
              className="highlightText"
            >
              provide suggestions
            </Link>{" "}
            for maintaining a safe and enjoyable environment.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
