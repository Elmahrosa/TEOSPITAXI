import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: "Missing userId", status: 400 }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: qualificationData, error: qualError } = await supabase.rpc("check_agent_qualification", {
      user_uuid: userId,
    })

    if (qualError) {
      console.error("[TeosPiTaxi] Qualification check error:", qualError)
      return NextResponse.json(
        { error: "Failed to check qualification", details: qualError.message, status: 500 },
        { status: 500 },
      )
    }

    const { data: stats, error: statsError } = await supabase
      .from("trips")
      .select("id, status")
      .eq("driver_id", userId)
      .eq("status", "completed")

    const completedTrips = stats?.length || 0

    const { data: referrals, error: refError } = await supabase
      .from("agent_referrals")
      .select("referred_user_id")
      .eq("agent_id", userId)

    const totalReferrals = referrals?.length || 0

    const { data: referralTrips, error: rtError } = await supabase
      .from("trips")
      .select("id")
      .or(
        `rider_id.in.(${referrals?.map((r) => r.referred_user_id).join(",") || "none"}),driver_id.in.(${referrals?.map((r) => r.referred_user_id).join(",") || "none"})`,
      )
      .eq("status", "completed")

    const referralTripCount = referralTrips?.length || 0

    const isQualified = qualificationData === true

    if (isQualified) {
      await supabase.rpc("promote_qualified_agents")
    }

    return NextResponse.json({
      qualified: isQualified,
      stats: {
        completedTrips,
        requiredTrips: 50,
        totalReferrals,
        requiredReferrals: 10,
        referralTripCount,
        requiredReferralTrips: 100,
      },
      message: isQualified
        ? "Congratulations! You are now an independent agent."
        : "Keep completing trips and referring new users to qualify as an independent agent.",
    })
  } catch (error: any) {
    console.error("[TeosPiTaxi] Check qualification error:", error)
    return NextResponse.json(
      { error: "Failed to check qualification", message: error.message, status: 500 },
      { status: 500 },
    )
  }
}
