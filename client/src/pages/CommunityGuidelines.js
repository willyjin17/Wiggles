import React from "react";
import { Link } from "react-router-dom";
import "../styles/guidelines.css";

const CommunityGuidelines = () => {
  return (
    <div>
      <div className="communityGuidelinesContainer">
        <h1 className="boldLinkHeading">Community Guidelines</h1>
        <ul className="guidelinesList">
          <li className="listItem">
            <b className="boldListItem">Accuracy and Authenticity:</b> Users
            must provide truthful information about their pets. False
            information or impersonation of others is strictly prohibited.
          </li>
          <li className="listItem">
            <b className="boldListItem">Privacy and Confidentiality:</b> Users
            should respect the privacy of others. Sharing personal information
            about other users without their consent is not allowed.
          </li>
          <li className="listItem">
            <b className="boldListItem">No Spamming or Advertising:</b> Users
            should refrain from spamming the platform with unnecessary
            information or advertisements. Wiggles is meant for genuine
            interactions and discussions about pets.
          </li>
          <li className="listItem">
            <b className="boldListItem">Content Guidelines:</b> Users are
            responsible for the content they post. Content that is
            inappropriate, offensive, or violates any laws or regulations will
            be removed.
          </li>
          <li className="listItem">
            <b className="boldListItem">
              No Abusive or Inappropriate Pictures:
            </b>{" "}
            Users must not post pictures that are abusive, inappropriate, or
            contain nudity. Such content will be removed immediately, and the
            user may face consequences.
          </li>
          <li className="listItem">
            <b className="boldListItem">Reporting Violations:</b> Users are
            encouraged to{" "}
            <Link
              to="/contact"
              target="_blank"
              className="highlightText"
            >
              report any violations
            </Link>{" "}
            of the community guidelines to the platform administrators. Prompt
            action will be taken against offenders.
          </li>
          <li className="listItem">
            <b className="boldListItem">Consequences of Violations:</b>{" "}
            Violations of the community guidelines may result in warnings,
            temporary suspension, or permanent banning of the user's account,
            depending on the severity of the offense.
          </li>
          <li className="listItem">
            <b className="boldListItem">Continuous Improvement:</b> The
            community guidelines are subject to updates and improvements based
            on feedback from the community. Users are encouraged to{" "}
            <Link
              to="/contact"
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
