import React from 'react';
import { Star, ExternalLink, ShieldCheck, MessageSquare, Calendar } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { PageId } from '../components/Navbar';

interface ReviewsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const { clinicConfig, reviews } = useClinic();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Patient Experience
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Verified Reviews & Ratings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Public feedback and ratings for Dr. D. K. Mishra Clinic on Google Maps.
        </p>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left sm:divide-x sm:divide-slate-200">
          
          {/* Rating Number */}
          <div className="space-y-1 sm:pr-6">
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {clinicConfig.googleRating}
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(clinicConfig.googleRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500">Out of 5.0 rating</p>
          </div>

          {/* Review Count & Platform */}
          <div className="space-y-1 sm:px-6">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Review Volume
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {clinicConfig.googleReviewCount} Patient Reviews
            </p>
            <p className="text-xs text-slate-500">Verified Google Business Profile</p>
          </div>

          {/* External Google Link */}
          <div className="sm:pl-6 space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Read all public patient reviews or contribute your own experience on Google.
            </p>
            <a
              href={clinicConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <span>Open on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>

        </div>
      </div>

      {/* Authorized Review Excerpts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Authorized Google Review Excerpts
          </h2>
          <span className="text-xs text-slate-400">
            Showing verified patient feedback
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Neutral initials avatar */}
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center">
                      {rev.authorInitials}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-900">{rev.authorName}</h3>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-teal-700" />
                  <span>{rev.source}</span>
                </span>

                {rev.sourceUrl && (
                  <a
                    href={rev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-700 inline-flex items-center gap-1"
                  >
                    <span>Google Link</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Integrity Policy */}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2 leading-relaxed">
        <h3 className="font-semibold text-slate-800">Our Review Transparency Policy</h3>
        <p>
          Dr. D. K. Mishra Clinic respects clinical ethics and authenticity. We do not generate artificial testimonials or fabricate ratings. All review statistics are sourced directly from our verified Google Maps listing in Hatia, Ranchi.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('book')}
          className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <Calendar size={15} />
          <span>Book a Consultation at the Clinic</span>
        </button>
      </div>

    </div>
  );
};
