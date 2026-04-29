/**
 * Home Page
 * Landing page of CleanTrack with project intro and how-it-works section.
 */
import { Link } from "react-router-dom";
import { Camera, Search, CheckCircle, Award, Leaf, ArrowRight } from "lucide-react";

const Home = () => {
  // Steps explaining how the app works
  const steps = [
    { icon: Camera, title: "1. Spot Pollution", desc: "Take a photo of the polluted area you want to report." },
    { icon: Search, title: "2. Submit Report", desc: "Upload the image with location and description details." },
    { icon: CheckCircle, title: "3. Get Verified", desc: "Our team reviews and verifies your pollution report." },
    { icon: Award, title: "4. Earn Rewards", desc: "Get reward points for every approved pollution report." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CleanTrack
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-primary-foreground/90">
            Pollution Reporting System
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-primary-foreground/75">
            Report pollution in your area, track your complaints, and earn rewards
            for making the environment cleaner.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Login <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container-page">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent rounded-full">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground mt-2">Reports Filed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">120+</p>
              <p className="text-muted-foreground mt-2">Issues Resolved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground mt-2">Active Users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
