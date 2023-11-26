import React from 'react'
import BlogPost from '../../components/BlogPost/BlogPost'
import './Blog.css'

export default function Blog({exposedMethod, ...props}: any) {
    return (
        <div>
            <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0' }}>Below articles reflect my passion for sharing knowledge, insights, and best practices in the market.</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <BlogPost
                    title="Configure GitHub Pages (Deployment)"
                    desc="Setting up GitHub Pages site with themes, custom layouts, dynamic elements and its integration with GitHub workflow."
                    date="16th June 2023"
                    reference = "github-site"
                    exposedMethod = {exposedMethod}
                    lang="Git" />
                <BlogPost
                    title="Everything about JWT Authentication"
                    desc="Discover JWT authentication and insights to implement secure authentication in your web-based systems and APIs."
                    date="16th June 2023"
                    reference = "jwt-authentication"
                    exposedMethod = {exposedMethod}
                    lang="NodeJS" />
                <BlogPost
                    title="GPG Signing for GIT Users"
                    desc="Exploring GPG Signing and its importance in verifying the authenticity and integrity of commits. Learn how to implement GPG signing to enhance security and trust in your Git repositories."
                    date="16th June 2023"
                    reference = "gpg-sign-in-git"
                    exposedMethod = {exposedMethod}
                    lang="NodeJS" />

                <BlogPost
                    title="GPG Signing for GIT Users"
                    desc="Exploring GPG Signing and its importance in verifying the authenticity and integrity of commits. Learn how to implement GPG signing to enhance security and trust in your Git repositories."
                    date="16th June 2023"
                    reference = "gpg-sign-in-git"
                    exposedMethod = {exposedMethod}
                    lang="NodeJS" />
            </div>
        </div>
    );
}
