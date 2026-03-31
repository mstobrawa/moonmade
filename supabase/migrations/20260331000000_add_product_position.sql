alter table public.products
add column if not exists position integer;

with ranked_products as (
  select
    id,
    row_number() over (
      order by created_at desc, id asc
    ) as next_position
  from public.products
)
update public.products as products
set position = ranked_products.next_position
from ranked_products
where products.id = ranked_products.id
  and (
    products.position is null
    or products.position <> ranked_products.next_position
  );

alter table public.products
alter column position set not null;

drop index if exists products_position_key;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_position_key'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
    add constraint products_position_key
    unique (position)
    deferrable initially deferred;
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_position_positive'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
    add constraint products_position_positive
    check (position > 0);
  end if;
end
$$;
