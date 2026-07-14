import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { socialLinks } from '../data/portfolioData';

// Extract username from github URL
const GITHUB_USERNAME = socialLinks.github.replace('https://github.com/', '');

const StatCard = ({ label, value, icon, delay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#ff2a2a]/40 hover:shadow-[0_0_30px_rgba(255,42,42,0.1)] transition-all duration-500 group"
  >
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-[#ff2a2a] transition-colors duration-300">
      {value}
    </div>
    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{label}</div>
  </div>
);

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user profile + repos in parallel
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = await reposRes.json();

        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
        const languages = [...new Set(repos.map(r => r.language).filter(Boolean))].length;

        setStats({
          repos: user.public_repos,
          followers: user.followers,
          stars: totalStars,
          forks: totalForks,
          languages,
          name: user.name || GITHUB_USERNAME,
          bio: user.bio,
          avatar: user.avatar_url,
          joined: new Date(user.created_at).getFullYear(),
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = stats
    ? [
        { label: 'Public Repos', value: stats.repos, icon: '📁', delay: '100' },
        { label: 'Total Stars', value: stats.stars, icon: '⭐', delay: '200' },
        { label: 'Forks', value: stats.forks, icon: '🔀', delay: '300' },
        { label: 'Languages', value: stats.languages, icon: '💻', delay: '400' },
      ]
    : [];

  return (
    <section
      id="github"
      className="bg-[#0a0a0a] pt-24 pb-20 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
              GitHub Activity
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight">
              Code in the <br className="hidden md:block" />
              <span className="text-[#ff2a2a]">open</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-md font-medium leading-relaxed">
              Live stats pulled directly from my GitHub profile. Every number is real.
            </p>
          </div>

          {/* GitHub profile card */}
          {stats && (
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 shrink-0"
            >
              <img
                src={stats.avatar}
                alt={stats.name}
                className="w-14 h-14 rounded-full border-2 border-[#ff2a2a]/50 object-cover"
              />
              <div>
                <p className="text-white font-black text-lg leading-tight">{stats.name}</p>
                {stats.bio && (
                  <p className="text-white/50 text-xs font-medium mt-0.5 max-w-[200px] leading-snug">{stats.bio}</p>
                )}
                <p className="text-white/30 text-xs font-bold mt-1 uppercase tracking-wider">Since {stats.joined}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
                <div className="h-8 bg-white/10 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-white/40 text-center py-12 text-base font-medium">
            Couldn't load GitHub stats right now — {' '}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2a2a] underline hover:text-red-400 transition-colors"
            >
              visit my GitHub directly
            </a>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {statItems.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* GitHub Calendar */}
            <div data-aos="fade-up" data-aos-delay="400" className="relative group bg-black/40 border border-white/10 rounded-3xl p-8 md:p-10 mb-10 overflow-hidden flex flex-col items-center backdrop-blur-xl hover:border-[#ff2a2a]/30 transition-all duration-700 shadow-2xl hover:shadow-[0_0_50px_rgba(255,42,42,0.15)]">
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#ff2a2a]/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="text-white font-black text-2xl mb-8 self-start flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-lg bg-[#ff2a2a]/20 text-[#ff2a2a]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </div>
                Contribution Activity
              </h3>
              
              <div className="w-full overflow-x-auto pb-4 relative z-10" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                <div className="min-w-[800px] flex justify-center py-4">
                  <GitHubCalendar 
                    username={GITHUB_USERNAME} 
                    colorScheme="dark"
                    theme={{
                      dark: ['#161b22', '#500000', '#8a0000', '#d00000', '#ff2a2a']
                    }}
                    fontSize={14}
                    blockSize={14}
                    blockMargin={6}
                  />
                </div>
              </div>
            </div>

            {/* GitHub CTA */}
            <div data-aos="fade-up" data-aos-delay="500" className="flex justify-center">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-base hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View All Repositories
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default GitHubStats;
