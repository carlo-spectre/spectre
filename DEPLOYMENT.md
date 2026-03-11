# Deployment Guide for spectredesign.studio

## Domain: spectredesign.studio
**Managed by:** Google Workspace

## DNS Configuration for Vercel

### Root Domain (spectredesign.studio)

**Option 1: A Record** (if CNAME not allowed for root)
- Type: `A`
- Name: `@` (or leave blank)
- Value: `76.76.21.21`
- TTL: `3600`

**Option 2: CNAME** (if supported)
- Type: `CNAME`
- Name: `@` (or leave blank)
- Value: `cname.vercel-dns.com`
- TTL: `3600`

### WWW Subdomain (www.spectredesign.studio)

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `3600`

## Steps to Configure

1. **Access Google Domains/Workspace DNS:**
   - Go to https://domains.google.com OR
   - Go to https://admin.google.com → Apps → Google Workspace → Domains

2. **Add DNS Records:**
   - Add the records listed above
   - Save changes

3. **In Vercel:**
   - Go to Settings → Domains
   - Add `spectredesign.studio`
   - Add `www.spectredesign.studio` (optional)
   - Wait for DNS verification (can take a few minutes to 48 hours)

4. **Verify:**
   - Vercel will automatically provision SSL certificate
   - Check domain status in Vercel dashboard
   - Test by visiting https://spectredesign.studio

## Notes

- DNS propagation can take 24-48 hours, but usually happens within minutes
- Vercel provides free SSL certificates automatically
- Make sure to remove any conflicting DNS records
- If you have existing A or CNAME records pointing elsewhere, remove or update them

