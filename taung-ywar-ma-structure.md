```
taung-ywar-ma/
│
├── frontend/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── harvest-calendar/
│   │   │   │       └── page.tsx
│   │   │   ├── farmers/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── archive/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── festivals/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── youth-blog/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── history/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── gallery/
│   │   │   │       └── page.tsx
│   │   │   ├── info/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── market-prices/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── announcements/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── emergency-contacts/
│   │   │   │       └── page.tsx
│   │   │   └── order/
│   │   │       └── page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── dashboard/
│   │   │       ├── page.tsx
│   │   │       ├── users/
│   │   │       │   ├── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── crops/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── farmers/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── festivals/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── youth-blog/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── announcements/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── market-prices/
│   │   │       │   ├── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── emergency-contacts/
│   │   │       │   ├── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       └── orders/
│   │   │           ├── page.tsx
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileMenu.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroBanner.tsx
│   │   │   │   ├── FeaturedCrops.tsx
│   │   │   │   ├── UpcomingFestivals.tsx
│   │   │   │   └── LatestAnnouncements.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── CropCard.tsx
│   │   │   │   ├── CropGrid.tsx
│   │   │   │   ├── HarvestCalendar.tsx
│   │   │   │   ├── FarmerCard.tsx
│   │   │   │   └── OrderRequestForm.tsx
│   │   │   ├── archive/
│   │   │   │   ├── FestivalCard.tsx
│   │   │   │   ├── BlogPostCard.tsx
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   └── HistoryTimeline.tsx
│   │   │   └── info/
│   │   │       ├── MarketPriceTable.tsx
│   │   │       ├── AnnouncementCard.tsx
│   │   │       └── EmergencyContactCard.tsx
│   │   ├── admin/
│   │   │   ├── layout/
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   └── AdminNav.tsx
│   │   │   ├── forms/
│   │   │   │   ├── CropForm.tsx
│   │   │   │   ├── FarmerForm.tsx
│   │   │   │   ├── FestivalForm.tsx
│   │   │   │   ├── BlogPostForm.tsx
│   │   │   │   ├── AnnouncementForm.tsx
│   │   │   │   ├── MarketPriceForm.tsx
│   │   │   │   ├── EmergencyContactForm.tsx
│   │   │   │   └── UserCreateForm.tsx
│   │   │   └── tables/
│   │   │       ├── DataTable.tsx
│   │   │       └── OrderTable.tsx
│   │   └── shared/
│   │       ├── ui/
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   ├── Modal.tsx
│   │       │   ├── Badge.tsx
│   │       │   ├── Card.tsx
│   │       │   ├── Spinner.tsx
│   │       │   ├── Pagination.tsx
│   │       │   └── ImageUpload.tsx
│   │       ├── SearchBar.tsx
│   │       └── ProtectedRoute.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── crops.ts
│   │   │   ├── farmers.ts
│   │   │   ├── festivals.ts
│   │   │   ├── blog.ts
│   │   │   ├── announcements.ts
│   │   │   ├── market-prices.ts
│   │   │   ├── emergency-contacts.ts
│   │   │   └── orders.ts
│   │   ├── auth/
│   │   │   ├── session.ts
│   │   │   └── permissions.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       └── validators.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCrops.ts
│   │   ├── useFarmer.ts
│   │   └── useSearch.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── crops.ts
│   │   ├── farmers.ts
│   │   ├── festivals.ts
│   │   ├── blog.ts
│   │   ├── announcements.ts
│   │   ├── market-prices.ts
│   │   ├── emergency-contacts.ts
│   │   └── orders.ts
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── settings/
    │   │   ├── base.py
    │   │   ├── development.py
    │   │   └── production.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    ├── apps/
    │   ├── authentication/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   ├── permissions.py
    │   │   └── admin.py
    │   ├── crops/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── admin.py
    │   ├── farmers/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── admin.py
    │   ├── orders/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── admin.py
    │   ├── archive/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── admin.py
    │   └── info_hub/
    │       ├── migrations/
    │       ├── models.py
    │       ├── serializers.py
    │       ├── views.py
    │       ├── urls.py
    │       └── admin.py
    ├── api/
    │   └── v1/
    │       └── urls.py
    ├── core/
    │   ├── permissions.py
    │   ├── pagination.py
    │   ├── exceptions.py
    │   └── utils.py
    ├── media/
    │   ├── crops/
    │   ├── farmers/
    │   ├── festivals/
    │   ├── gallery/
    │   └── blog/
    ├── requirements/
    │   ├── base.txt
    │   ├── development.txt
    │   └── production.txt
    └── manage.py
```
