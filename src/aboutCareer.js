import React from "react";

export default function(props) {
    console.log("props", props);
    return (
        <div>
        {props.careerPath == "code" && (<div className="path-description">
            <h2 className="path-title">What is a Web Developer?</h2>
            <p className="path-p">
                There are more than 1.25 billion websites online with thousands more added each day. Web developers are the individuals responsible for making that happen. They take a static visual design and turn it into a working, online website which people can visit and interact with. <br /> <br />This path begins with the basics of HTML but progresses quickly through CSS, JavaScript, and React so that you can go from no-code to full-stack at your own pace.
            </p>
            <div className="list">
                <p className="list-p"> &#10004; HTML & CSS</p>
                <p className="list-p"> &#10004; Javascript</p>
                <p className="list-p"> &#10004; Git</p>
                <p className="list-p"> &#10004; Command Line</p>
                <p className="list-p"> &#10004; SQL and Databases</p>
                <p className="list-p"> &#10004; API</p>
            </div>
        </div>)}
        {props.careerPath == "design" && (<div className="path-description">
                <h2 className="path-title">What is a Web Designer?</h2>
                    <p className="path-p">
                    A web designer's main job is to design web pages. There is a lot to consider in the design of websites which may not be immediately apparent when looking at a webpage for the first time. <br /> <br />

                    The aesthetic aspect is an important one and selecting the appropriate colors, font, layout and images creates the whole personality of the website. In addition to considering aesthetic aspects, the usability of the website has to be a priority. It is important to create a page that the target market can relate to.

                    </p>
                    <div className="list">
                        <p className="list-p"> &#10004; Visual Design</p>
                        <p className="list-p"> &#10004; UX</p>
                        <p className="list-p"> &#10004; Design Software</p>
                        <p className="list-p"> &#10004; HTML & CSS</p>
                        <p className="list-p"> &#10004; Communication</p>
                        <p className="list-p"> &#10004; User Psychology</p>
                    </div>
                </div>)}
                {props.careerPath == "product" && (<div className="path-description">
                <h2 className="path-title">What is a Product Manager?</h2>
                <p className="path-p">
                        Product managers are responsible for guiding the success of a product and leading the cross-functional team that is responsible for improving it. It is an important organizational role — especially in technology companies — that sets the strategy, roadmap, and feature definition for a product or product line. <br /> <br />Product managers provide the deep product expertise needed to lead the organization and make strategic product decisions. They often analyze market and competitive conditions, laying out a product vision that is differentiated and delivers unique value based on customer demands.
                </p>
                <div className="list">
                    <p className="list-p"> &#10004; Product strategy</p>
                    <p className="list-p"> &#10004; User experience testing</p>
                    <p className="list-p"> &#10004; Task management</p>
                    <p className="list-p"> &#10004; Google Docs</p>
                    <p className="list-p"> &#10004; JIRA</p>
                    <p className="list-p"> &#10004; Trello</p>
                </div>
            </div>)}
            {props.careerPath == "datascience" && (<div className="path-description">
            <h2 className="path-title">What is a Data Scientist?</h2>
            <p className="path-p">
                    Data Science is one of the fastest growing fields in tech. Data scientists are a new breed of analytical data expert who have the technical skills to solve complex problems – and the curiosity to explore what problems need to be solved. <br /> <br />
                    Many data scientists began their careers as statisticians or data analysts. They’re part mathematician, part computer scientist and part trend-spotter. And, because they straddle both the business and IT worlds, they’re highly sought-after and well-paid. Who wouldn’t want to be one?
            </p>
            <div className="list">
                <p className="list-p"> &#10004; Data visualization</p>
                <p className="list-p"> &#10004; Machine learning</p>
                <p className="list-p"> &#10004; Pattern recognition</p>
                <p className="list-p"> &#10004; Hadoop and MapReduce</p>
                <p className="list-p"> &#10004; MySQL and Postgres</p>
                <p className="list-p"> &#10004; SAS or Python</p>
            </div>
        </div>)}
        {props.careerPath == "marketing" && (<div className="path-description">
        <h2 className="path-title">What is a Digital Marketing Manager?</h2>
        <p className="path-p">
                A digital marketing manager is responsible for developing, implementing and managing marketing campaigns that promote a company and its products and/or services. He or she plays a major role in enhancing brand awareness within the digital space as well as driving website traffic and acquiring leads/customers. <br /> <br />
                A digital marketing manager also identifies and evaluates new digital technologies and uses Web analytics tools to measure site traffic to better optimize marketing campaigns, email marketing, social media and display and search advertising.
        </p>
        <div className="list">
            <p className="list-p"> &#10004; Social media</p>
            <p className="list-p"> &#10004; Email marketing</p>
            <p className="list-p"> &#10004; Google analytics</p>
            <p className="list-p"> &#10004; Content creation</p>
            <p className="list-p"> &#10004; Visual marketing</p>
            <p className="list-p"> &#10004; Search engine marketing</p>
        </div>
    </div>)}
    {props.careerPath == "smm" && (<div className="path-description">
    <h2 className="path-title">What is a Social Media Manager?</h2>
    <p className="path-p">
            Social media managers are in charge of representing a company across social channels as the sole voice of the brand. They respond to comments, compile campaigns and create content. These experts provide organizations with the guidance needed to enhance their online presence. <br /> <br />
            With clear goals like: “improve website traffic” or “optimize brand awareness,” social media managers grow a business through social networks such as Facebook, Instagram and Twitter. A decade ago, this role was non-existent. Now, more companies embrace social media for customer acquisition, and social management is often essential.
    </p>
    <div className="list">
        <p className="list-p"> &#10004; Copywriting</p>
        <p className="list-p"> &#10004; Customer service</p>
        <p className="list-p"> &#10004; Visual marketing</p>
        <p className="list-p"> &#10004; Design and photo editing</p>
        <p className="list-p"> &#10004; Analytics and reporting</p>
        <p className="list-p"> &#10004; Search engine optimization</p>
    </div>
</div>)}
        </div>
    );
}
