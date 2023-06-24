import React from 'react'
import BlogPost from '../../components/BlogPost/BlogPost'

export default function Blog() {
    return (
        <div style={{marginTop:'100px'}}>
            <p style={{ fontSize: '22px', color: '#4a4a4a', marginBottom: '0px' }}>📝 Blogs</p>
            <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0' }}>Below articles reflect my passion for sharing knowledge, insights, and best practices in the market.</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <BlogPost
                    title="Configure GitHub Pages (Deployment)"
                    desc="Learn how to setup and configure GitHub Pages site with themes, custom layouts, and dynamic elements, while enjoying seamless updates and maintenance through its integration with your GitHub workflow."
                    lang="Git" />
                <BlogPost
                    title="Everything about JWT Authentication"
                    desc="Discover the ins and outs of JWT authentication and gain valuable insights to implement secure authentication in your web-based systems and APIs. Explore public websites to generate JWT tokens and learn how to use them."
                    date="16th June 2023"
                    lang="NodeJS" />
                <BlogPost
                    title="GPG Signing for GIT Users"
                    desc="Exploring GPG Signing and its importance in verifying the authenticity and integrity of commits. Learn how to implement GPG signing to enhance security and trust in your Git repositories."
                    date="16th June 2023"
                    lang="NodeJS" />
            </div>
        </div>
    );
}
